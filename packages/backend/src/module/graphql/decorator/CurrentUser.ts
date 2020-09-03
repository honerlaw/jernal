import { GqlExecutionContext } from "@nestjs/graphql";
import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
    return GqlExecutionContext.create(context).getContext().req.user;
});
