import { Request } from "express";

export interface authenticated_user {
  userId?: string;
  email?: string;
}

// ✅ Use generics to keep Express type compatibility
export interface authenticated_request<
  Params = any,
  ResBody = any,
  ReqBody = any,
  ReqQuery = any
> extends Request<Params, ResBody, ReqBody, ReqQuery> {
  user?: authenticated_user;
}