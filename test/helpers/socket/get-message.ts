export function getMessageAsync<T>(
  client: SocketIOClient.Socket,
  eventName: string,
): Promise<T> {
  return new Promise<T>((resolve) => {
    client.once(eventName, (command: T) => {
      resolve(command);
    });
  });
}
