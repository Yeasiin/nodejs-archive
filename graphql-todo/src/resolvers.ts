import Task from "./model/Task";

export const resolvers = {
  Query: {
    tasks: async () => {
      return await Task.find();
    },
    task: async () => await Task.findOne(),
  },
  Mutation: {
    CreateTask: async (
      _: unknown,
      { title, author }: { title: string; author: string }
    ) => {
      const result = await Task.create({ title, author });
      return result;
    },
  },
};
