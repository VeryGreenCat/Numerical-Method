import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private users: UsersService,
    private jwt: JwtService,
    private config: ConfigService,
    private prisma: PrismaService,
  ) {}

  // ─── Guest ────────────────────────────────────────────────
  async loginAsGuest() {
    const user = await this.users.createGuestUser();
    const tokens = await this.generateTokens(user.id, true);
    return { user, ...tokens };
  }

  // ─── Register ─────────────────────────────────────────────
  async register(
    email: string,
    password: string,
    displayName: string,
    guestUserId?: string,
  ) {
    const existing = await this.users.findByEmail(email);
    if (existing) throw new ConflictException('Email already in use');

    const passwordHash = await argon2.hash(password);

    let user;
    if (guestUserId) {
      // guest is signing up → promote their existing row
      user = await this.users.promoteGuest(
        guestUserId,
        email,
        passwordHash,
        displayName,
      );
    } else {
      user = await this.users.createEmailUser(email, passwordHash, displayName);
    }

    const tokens = await this.generateTokens(user.id, false);
    await this.saveRefreshToken(user.id, tokens.refreshToken);
    return { user, ...tokens };
  }

  // ─── Login ────────────────────────────────────────────────
  async login(email: string, password: string, guestUserId?: string) {
    const user = await this.users.findByEmail(email);
    if (!user || !user.passwordHash)
      throw new UnauthorizedException('Incorrect email');

    const valid = await argon2.verify(user.passwordHash, password);
    if (!valid) throw new UnauthorizedException('Incorrect password');

    // merge guest calculations into real account if guest existed
    if (guestUserId && guestUserId !== user.id) {
      await this.mergeGuestCalculations(guestUserId, user.id); 
    }

    const tokens = await this.generateTokens(user.id, false);
    await this.saveRefreshToken(user.id, tokens.refreshToken);
    return { user, ...tokens };
  }

  // ─── Refresh Token ────────────────────────────────────────
  async refresh(refreshToken: string) {
    const session = await this.prisma.session.findUnique({
      where: { refreshToken },
      include: { user: true },
    });

    if (!session || session.expiresAt < new Date()) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    // rotate — delete old, issue new
    await this.prisma.session.delete({ where: { id: session.id } });
    const tokens = await this.generateTokens(
      session.user.id,
      session.user.isGuest,
    );
    await this.saveRefreshToken(session.user.id, tokens.refreshToken);
    return tokens;
  }

  // ─── Logout ───────────────────────────────────────────────
  async logout(refreshToken: string) {
    await this.prisma.session.deleteMany({ where: { refreshToken } });
  }

  // ─── Helpers ──────────────────────────────────────────────
  private async generateTokens(userId: string, isGuest: boolean) {
    const payload = { sub: userId, isGuest };

    const accessToken = await this.jwt.signAsync(payload, {
      secret: this.config.get('JWT_SECRET'),
      expiresIn: '15m',
    });

    const refreshToken = await this.jwt.signAsync(payload, {
      secret: this.config.get('JWT_REFRESH_SECRET'),
      expiresIn: '30d',
    });

    return { accessToken, refreshToken };
  }

  private async saveRefreshToken(userId: string, refreshToken: string) {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30); // 30 days from now

    await this.prisma.session.create({
      data: { userId, refreshToken, expiresAt },
    });
  }

  private async mergeGuestCalculations(
    guestUserId: string,
    realUserId: string,
  ) {
    // move all guest calculations to the real account
    await this.prisma.calculation.updateMany({
      where: { userId: guestUserId },
      data: { userId: realUserId },
    });
    // delete the ghost guest user
    await this.prisma.user.delete({ where: { id: guestUserId } });
  }
}
