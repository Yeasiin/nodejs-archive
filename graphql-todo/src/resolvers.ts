import { MyContext } from ".";

export const resolvers = {
  Query: {
    task: async (
      parent: unknown,
      { id }: { id: number },
      context: MyContext
    ) => {
      return await context.db.Task.findById(id);
    },
    tasks: async (parent: unknown, args: unknown, context: MyContext) => {
      return await context.db.Task.find();
    },
  },
  Mutation: {
    CreateTask: async (
      parent: unknown,
      { title, author }: { title: string; author: string },
      context: MyContext
    ) => {
      return await context.db.Task.create({ title, author });
    },

    UpdateTask: async (
      parent: unknown,
      { id, data }: { id: string; data: Object },
      context: MyContext
    ) => {
      return await context.db.Task.findByIdAndUpdate(
        id,
        { ...data },
        { new: true }
      );
    },

    DeleteTask: async (
      parent: unknown,
      { id }: { id: string },
      context: MyContext
    ) => {
      return await context.db.Task.findByIdAndRemove(id);
    },
  },
};
