import { Comprehend } from "../Comprehend";
import { ComprehendClient } from "../ComprehendClient";
import {
  ListTopicsDetectionJobsCommand,
  ListTopicsDetectionJobsCommandInput,
  ListTopicsDetectionJobsCommandOutput,
} from "../commands/ListTopicsDetectionJobsCommand";
import { ComprehendPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";

const makePagedClientRequest = async (
  client: ComprehendClient,
  input: ListTopicsDetectionJobsCommandInput,
  ...args: any
): Promise<ListTopicsDetectionJobsCommandOutput> => {
  // @ts-ignore
  return await client.send(new ListTopicsDetectionJobsCommand(input, ...args));
};
const makePagedRequest = async (
  client: Comprehend,
  input: ListTopicsDetectionJobsCommandInput,
  ...args: any
): Promise<ListTopicsDetectionJobsCommandOutput> => {
  // @ts-ignore
  return await client.listTopicsDetectionJobs(input, ...args);
};
export async function* listTopicsDetectionJobsPaginate(
  config: ComprehendPaginationConfiguration,
  input: ListTopicsDetectionJobsCommandInput,
  ...additionalArguments: any
): Paginator<ListTopicsDetectionJobsCommandOutput> {
  let token: string | undefined = config.startingToken || "";
  let hasNext = true;
  let page: ListTopicsDetectionJobsCommandOutput;
  while (hasNext) {
    input["NextToken"] = token;
    input["MaxResults"] = config.pageSize;
    if (config.client instanceof Comprehend) {
      page = await makePagedRequest(config.client, input, ...additionalArguments);
    } else if (config.client instanceof ComprehendClient) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected Comprehend | ComprehendClient");
    }
    yield page;
    token = page["NextToken"];
    hasNext = !!token;
  }
  // @ts-ignore
  return undefined;
}
