import { UnauthorizedException } from "@nestjs/common";
import { User } from "generated/prisma/client";



/**
 * Check if user has admin role
 * @param user User object
 * @returns true if user is admin
 */
function isAdmin(user?: User): boolean {
  return user?.role === "admin";
}

/**
 * Check if user is authorized to access/modify a resource
 * @param user User object
 * @param resourceOwnerId ID of the resource owner
 * @returns true if user is admin or owns the resource
 */
function isAuthorized(user: User, resourceOwnerId: number): boolean {
  if (!user) throw new UnauthorizedException("User not provided");
  return isAdmin(user) || user.idUser === resourceOwnerId;
}

export{/*checkauthorization,*/ isAdmin, isAuthorized}
