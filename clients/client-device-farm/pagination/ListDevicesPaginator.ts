import { DeviceFarm } from "../DeviceFarm";
import { DeviceFarmClient } from "../DeviceFarmClient";
import { ListDevicesCommand, ListDevicesCommandInput, ListDevicesCommandOutput } from "../commands/ListDevicesCommand";
import { DeviceFarmPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";

const makePagedClientRequest = async (
  client: DeviceFarmClient,
  input: ListDevicesCommandInput,
  ...args: any
): Promise<ListDevicesCommandOutput> => {
  // @ts-ignore
  return await client.send(new ListDevicesCommand(input, ...args));
};
const makePagedRequest = async (
  client: DeviceFarm,
  input: ListDevicesCommandInput,
  ...args: any
): Promise<ListDevicesCommandOutput> => {
  // @ts-ignore
  return await client.listDevices(input, ...args);
};
export async function* listDevicesPaginate(
  config: DeviceFarmPaginationConfiguration,
  input: ListDevicesCommandInput,
  ...additionalArguments: any
): Paginator<ListDevicesCommandOutput> {
  let token: string | undefined = config.startingToken || "";
  let hasNext = true;
  let page: ListDevicesCommandOutput;
  while (hasNext) {
    input["nextToken"] = token;
    if (config.client instanceof DeviceFarm) {
      page = await makePagedRequest(config.client, input, ...additionalArguments);
    } else if (config.client instanceof DeviceFarmClient) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected DeviceFarm | DeviceFarmClient");
    }
    yield page;
    token = page["nextToken"];
    hasNext = !!token;
  }
  // @ts-ignore
  return undefined;
}
