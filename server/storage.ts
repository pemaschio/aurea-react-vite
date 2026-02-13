import { eq } from "drizzle-orm";
import { db } from "./db";
import * as schema from "@shared/schema";

export const storage = {
  // Profile
  async getProfile(userId: string) {
    const [profile] = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, userId));
    return profile ?? null;
  },

  async updateProfile(userId: string, data: { name?: string; phone?: string }) {
    const [updated] = await db
      .update(schema.users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(schema.users.id, userId))
      .returning();
    return updated;
  },

  // Portfolio
  async getPortfolioAssets(userId: string) {
    return db
      .select()
      .from(schema.portfolioAssets)
      .innerJoin(
        schema.portfolios,
        eq(schema.portfolioAssets.portfolioId, schema.portfolios.id)
      )
      .where(eq(schema.portfolios.userId, userId));
  },

  // Watchlist
  async getWatchlist(userId: string) {
    return db
      .select()
      .from(schema.watchlistItems)
      .where(eq(schema.watchlistItems.userId, userId));
  },

  // Market Indicators
  async getMarketIndicators() {
    return db.select().from(schema.marketIndicators);
  },

  // Conversations
  async getConversationMessages(userId: string) {
    const [conversation] = await db
      .select()
      .from(schema.conversations)
      .where(eq(schema.conversations.userId, userId))
      .limit(1);

    if (!conversation) return [];

    return db
      .select()
      .from(schema.conversationMessages)
      .where(eq(schema.conversationMessages.conversationId, conversation.id));
  },
};
