import Task from "./model/Task";

export const resolvers = {
  Query: {
    task: async (parent: unknown, { id }: { id: number }, context: any) => {
      return await Task.findById(id);
    },
    tasks: async () => {
      const results = await Task.find();
      return results;
    },
  },
  Mutation: {
    CreateTask: async (
      _: unknown,
      { title, author }: { title: string; author: string }
    ) => {
      const result = await Task.create({ title, author });
      return result;
    },

    UpdateTask: async (
      _: unknown,
      { id, data }: { id: string; data: Object }
    ) => {
      const updated = await Task.findByIdAndUpdate(
        id,
        { ...data },
        { new: true }
      );
      console.log(data);
      return updated;
    },

    DeleteTask: async (_: unknown, { id }: { id: string }) => {
      const deleted = await Task.findByIdAndRemove(id);
      return deleted;
    },
  },
};
