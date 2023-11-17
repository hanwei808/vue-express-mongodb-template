import { IError, IResponse  } from './types/index';



export type ApiResponse = {
  error: IError | null;
  response: IResponse | null;
};

export function handleApiResponse(promise: Promise<IResponse>): Promise<ApiResponse> {
  return promise
    .then(response => ({
      error: null,
      response: response.data as IResponse,
    }))
    .catch(error => ({
      error,
      response: null,
    }));
}

export default handleApiResponse;