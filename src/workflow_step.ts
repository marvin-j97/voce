import { IHaxanResponse } from "haxan";

import { IRunnerContext } from "./runner";

export type ValidatorFunction<T> = (body: T) => unknown;
export type ValueGetter<T> = T | (() => T);

export class WorkflowStep {
  _title?: string;
  _url: ValueGetter<string>;
  _method: ValueGetter<string> = "GET";
  _status: number;
  _query: ValueGetter<Record<string, string>> = {};
  _headers: ValueGetter<Record<string, string>> = {};
  _body?: ValueGetter<unknown>;

  _todo = false;
  _skip = false;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _bodyValidator?: ValidatorFunction<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _headersValidator?: ValidatorFunction<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _responseValidator?: ValidatorFunction<any>;

  _onBefore?: (ctx: IRunnerContext & { step: WorkflowStep }) => unknown;
  _onAfter?: (
    ctx: IRunnerContext & {
      step: WorkflowStep;
      response: IHaxanResponse<unknown>;
    },
  ) => unknown;
  _onSuccess?: (
    ctx: IRunnerContext & {
      step: WorkflowStep;
      response: IHaxanResponse<unknown>;
    },
  ) => unknown;
  _onFail?: (
    ctx: IRunnerContext & {
      step: WorkflowStep;
      response: IHaxanResponse<unknown>;
    },
  ) => unknown;

  constructor(url: ValueGetter<string>, status: number) {
    this._url = url;
    this._status = status;
  }

  body(body: unknown): this {
    this._body = body;
    return this;
  }

  title(title: string): this {
    this._title = title;
    return this;
  }

  method(method: string): this {
    this._method = method;
    return this;
  }

  status(status: number): this {
    this._status = status;
    return this;
  }

  query(query: ValueGetter<Record<string, string>>): this {
    this._query = query;
    return this;
  }

  headers(headers: ValueGetter<Record<string, string>>): this {
    this._headers = headers;
    return this;
  }

  todo(todo = true): this {
    this._todo = todo;
    return this;
  }

  skip(skip = true): this {
    this._skip = skip;
    return this;
  }

  validateBody<T>(validator: ValidatorFunction<T>): this {
    this._bodyValidator = validator;
    return this;
  }

  validateHeaders(validator: ValidatorFunction<Record<string, string>>): this {
    this._headersValidator = validator;
    return this;
  }

  validateResponse(
    validator: ValidatorFunction<
      IRunnerContext & {
        step: WorkflowStep;
        response: IHaxanResponse<unknown>;
      }
    >,
  ): this {
    this._responseValidator = validator;
    return this;
  }

  onBefore(
    callback: (ctx: IRunnerContext & { step: WorkflowStep }) => unknown,
  ): this {
    this._onBefore = callback;
    return this;
  }

  onAfter(
    callback: (
      ctx: IRunnerContext & {
        step: WorkflowStep;
        response: IHaxanResponse<unknown>;
      },
    ) => unknown,
  ): this {
    this._onAfter = callback;
    return this;
  }

  onSuccess(
    callback: (
      ctx: IRunnerContext & {
        step: WorkflowStep;
        response: IHaxanResponse<unknown>;
      },
    ) => unknown,
  ): this {
    this._onSuccess = callback;
    return this;
  }

  onFail(
    callback: (
      ctx: IRunnerContext & {
        step: WorkflowStep;
        response: IHaxanResponse<unknown>;
      },
    ) => unknown,
  ): this {
    this._onFail = callback;
    return this;
  }
}
