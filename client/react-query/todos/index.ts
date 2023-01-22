export const todoKeys = {
  all: ['getTodos'],
  detail:(id: string)=>['getTodo', id],
} as const