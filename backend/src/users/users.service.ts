import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async createEmailUser(
    email: string,
    passwordHash: string,
    displayName?: string,
  ) {
    return this.prisma.user.create({
      data: { email, passwordHash, displayName, isGuest: false },
    });
  }

  async createGuestUser() {
    return this.prisma.user.create({
      data: { isGuest: true },
    });
  }

  async promoteGuest(
    userId: string,
    email: string,
    passwordHash: string,
    displayName?: string,
  ) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { email, passwordHash, displayName, isGuest: false },
    });
  }
}
