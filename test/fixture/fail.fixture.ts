import { Workflow } from "../../src/workflow";

export default function (_ctx: any): Workflow {
  return {
    title: "Google",
    baseUrl: "https://google.com",
    steps: [
      {
        url: () => "/",
        status: 201,
        method: "HEAD",
      },
    ],
  };
}
