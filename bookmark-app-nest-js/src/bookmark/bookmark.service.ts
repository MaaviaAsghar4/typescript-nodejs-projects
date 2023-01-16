import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookmarkDTO, EditBookmarkDTO } from './dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  getBookmarks(userId: string) {
    return this.prisma.bookmark.findMany({
      where: {
        userId,
      },
    });
  }

  getBookmarkById(userId: string, bookmarkId: string) {
    return this.prisma.bookmark.findUnique({
      where: {
        userId,
        id: bookmarkId,
      },
    });
  }

  async createBookmarkById(userId: string, dto: CreateBookmarkDTO) {
    const bookmark = await this.prisma.bookmark.create({
      data: {
        userId,
        ...dto,
      },
    });

    return bookmark;
  }

  async editBookmarkById(
    userId: string,
    bookmarkId: string,
    dto: EditBookmarkDTO,
  ) {
    const bookmark = await this.prisma.bookmark.findUnique({
      where: {
        id: bookmarkId,
      },
    });

    if (!bookmark || bookmark.userId !== userId) {
      throw new ForbiddenException('Unauthorized');
    }
    return this.prisma.bookmark.update({
      where: {
        id: bookmarkId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteBookmarkById(userId: string, bookmarkId: string) {
    const bookmark = await this.prisma.bookmark.findUnique({
      where: {
        id: bookmarkId,
      },
    });

    if (!bookmark || bookmark.userId !== userId) {
      throw new ForbiddenException('Unauthorized');
    }

    await this.prisma.bookmark.delete({
      where: {
        id: bookmarkId,
      },
    });
  }
}
