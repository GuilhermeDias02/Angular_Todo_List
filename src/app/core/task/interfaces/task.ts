import { User } from "../../auth/interfaces/user"

export interface Task {
    id: number,
    title: string,
    description: string,
    status: TaskStatus,
    createdAt: Date,
    updatedAt: Date,
    user?: User
}

export enum TaskStatus {
    PENDING = "PENDING",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE"
}

export interface CreateTask {
    title: string,
    description: string,
    status?: TaskStatus,
    targetUserId?: number
}
