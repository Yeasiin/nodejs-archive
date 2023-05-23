// extending the express request to hold user
declare module Express {
  export interface Request {
    user: any;
  }
}
