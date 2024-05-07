export default interface Repository<T> {
  create: (data: any) => Promise<T>;
}
