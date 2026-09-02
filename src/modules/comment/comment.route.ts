import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { commentController } from "./comment.controller";

const router = Router();

router.get("/author/:authorId", commentController.getCommentsByAuthorId);
router.post("/", auth(Role.ADMIN, Role.AUTHOR, Role.USER), commentController.createComment);
router.get("/:postId", commentController.getCommentByPostId);

// PATCH	/api/comments/:commentId	Update a comment owned by the logged-in user.
// DELETE	/api/comments/:commentId	Delete a comment owned by the logged-in user.
// PATCH	/api/comments/:commentId/moderate   Allow admin moderation of comment status.

export const commentRouter = router;