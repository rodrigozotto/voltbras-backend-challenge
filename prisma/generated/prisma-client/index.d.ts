// Code generated by Prisma (prisma@1.34.10). DO NOT EDIT.
// Please don't change this file manually but run `prisma generate` to update it.
// For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

import { DocumentNode } from "graphql";
import {
  makePrismaClientClass,
  BaseClientOptions,
  Model
} from "prisma-client-lib";
import { typeDefs } from "./prisma-schema";

export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  U[keyof U];

export type Maybe<T> = T | undefined | null;

export interface Exists {
  exoplanet: (where?: ExoplanetWhereInput) => Promise<boolean>;
}

export interface Node {}

export type FragmentableArray<T> = Promise<Array<T>> & Fragmentable;

export interface Fragmentable {
  $fragment<T>(fragment: string | DocumentNode): Promise<T>;
}

export interface Prisma {
  $exists: Exists;
  $graphql: <T = any>(
    query: string,
    variables?: { [key: string]: any }
  ) => Promise<T>;

  /**
   * Queries
   */

  exoplanet: (where: ExoplanetWhereUniqueInput) => ExoplanetNullablePromise;
  exoplanets: (args?: {
    where?: ExoplanetWhereInput;
    orderBy?: ExoplanetOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => FragmentableArray<Exoplanet>;
  exoplanetsConnection: (args?: {
    where?: ExoplanetWhereInput;
    orderBy?: ExoplanetOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => ExoplanetConnectionPromise;
  node: (args: { id: ID_Output }) => Node;

  /**
   * Mutations
   */

  createExoplanet: (data: ExoplanetCreateInput) => ExoplanetPromise;
  updateExoplanet: (args: {
    data: ExoplanetUpdateInput;
    where: ExoplanetWhereUniqueInput;
  }) => ExoplanetPromise;
  updateManyExoplanets: (args: {
    data: ExoplanetUpdateManyMutationInput;
    where?: ExoplanetWhereInput;
  }) => BatchPayloadPromise;
  upsertExoplanet: (args: {
    where: ExoplanetWhereUniqueInput;
    create: ExoplanetCreateInput;
    update: ExoplanetUpdateInput;
  }) => ExoplanetPromise;
  deleteExoplanet: (where: ExoplanetWhereUniqueInput) => ExoplanetPromise;
  deleteManyExoplanets: (where?: ExoplanetWhereInput) => BatchPayloadPromise;

  /**
   * Subscriptions
   */

  $subscribe: Subscription;
}

export interface Subscription {
  exoplanet: (
    where?: ExoplanetSubscriptionWhereInput
  ) => ExoplanetSubscriptionPayloadSubscription;
}

export interface ClientConstructor<T> {
  new (options?: BaseClientOptions): T;
}

/**
 * Types
 */

export type ExoplanetOrderByInput =
  | "id_ASC"
  | "id_DESC"
  | "name_ASC"
  | "name_DESC"
  | "hasStation_ASC"
  | "hasStation_DESC";

export type MutationType = "CREATED" | "UPDATED" | "DELETED";

export interface ExoplanetCreateInput {
  id?: Maybe<Int>;
  name: String;
  hasStation?: Maybe<Boolean>;
}

export interface ExoplanetUpdateInput {
  name?: Maybe<String>;
  hasStation?: Maybe<Boolean>;
}

export interface ExoplanetWhereInput {
  id?: Maybe<Int>;
  id_not?: Maybe<Int>;
  id_in?: Maybe<Int[] | Int>;
  id_not_in?: Maybe<Int[] | Int>;
  id_lt?: Maybe<Int>;
  id_lte?: Maybe<Int>;
  id_gt?: Maybe<Int>;
  id_gte?: Maybe<Int>;
  name?: Maybe<String>;
  name_not?: Maybe<String>;
  name_in?: Maybe<String[] | String>;
  name_not_in?: Maybe<String[] | String>;
  name_lt?: Maybe<String>;
  name_lte?: Maybe<String>;
  name_gt?: Maybe<String>;
  name_gte?: Maybe<String>;
  name_contains?: Maybe<String>;
  name_not_contains?: Maybe<String>;
  name_starts_with?: Maybe<String>;
  name_not_starts_with?: Maybe<String>;
  name_ends_with?: Maybe<String>;
  name_not_ends_with?: Maybe<String>;
  hasStation?: Maybe<Boolean>;
  hasStation_not?: Maybe<Boolean>;
  AND?: Maybe<ExoplanetWhereInput[] | ExoplanetWhereInput>;
  OR?: Maybe<ExoplanetWhereInput[] | ExoplanetWhereInput>;
  NOT?: Maybe<ExoplanetWhereInput[] | ExoplanetWhereInput>;
}

export interface ExoplanetUpdateManyMutationInput {
  name?: Maybe<String>;
  hasStation?: Maybe<Boolean>;
}

export interface ExoplanetSubscriptionWhereInput {
  mutation_in?: Maybe<MutationType[] | MutationType>;
  updatedFields_contains?: Maybe<String>;
  updatedFields_contains_every?: Maybe<String[] | String>;
  updatedFields_contains_some?: Maybe<String[] | String>;
  node?: Maybe<ExoplanetWhereInput>;
  AND?: Maybe<
    ExoplanetSubscriptionWhereInput[] | ExoplanetSubscriptionWhereInput
  >;
  OR?: Maybe<
    ExoplanetSubscriptionWhereInput[] | ExoplanetSubscriptionWhereInput
  >;
  NOT?: Maybe<
    ExoplanetSubscriptionWhereInput[] | ExoplanetSubscriptionWhereInput
  >;
}

export type ExoplanetWhereUniqueInput = AtLeastOne<{
  id: Maybe<Int>;
}>;

export interface NodeNode {
  id: ID_Output;
}

export interface ExoplanetPreviousValues {
  id: Int;
  name: String;
  hasStation?: Boolean;
}

export interface ExoplanetPreviousValuesPromise
  extends Promise<ExoplanetPreviousValues>,
    Fragmentable {
  id: () => Promise<Int>;
  name: () => Promise<String>;
  hasStation: () => Promise<Boolean>;
}

export interface ExoplanetPreviousValuesSubscription
  extends Promise<AsyncIterator<ExoplanetPreviousValues>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<Int>>;
  name: () => Promise<AsyncIterator<String>>;
  hasStation: () => Promise<AsyncIterator<Boolean>>;
}

export interface BatchPayload {
  count: Long;
}

export interface BatchPayloadPromise
  extends Promise<BatchPayload>,
    Fragmentable {
  count: () => Promise<Long>;
}

export interface BatchPayloadSubscription
  extends Promise<AsyncIterator<BatchPayload>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Long>>;
}

export interface AggregateExoplanet {
  count: Int;
}

export interface AggregateExoplanetPromise
  extends Promise<AggregateExoplanet>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregateExoplanetSubscription
  extends Promise<AsyncIterator<AggregateExoplanet>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export interface ExoplanetSubscriptionPayload {
  mutation: MutationType;
  node: Exoplanet;
  updatedFields: String[];
  previousValues: ExoplanetPreviousValues;
}

export interface ExoplanetSubscriptionPayloadPromise
  extends Promise<ExoplanetSubscriptionPayload>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = ExoplanetPromise>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = ExoplanetPreviousValuesPromise>() => T;
}

export interface ExoplanetSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<ExoplanetSubscriptionPayload>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = ExoplanetSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = ExoplanetPreviousValuesSubscription>() => T;
}

export interface Exoplanet {
  id: Int;
  name: String;
  hasStation?: Boolean;
}

export interface ExoplanetPromise extends Promise<Exoplanet>, Fragmentable {
  id: () => Promise<Int>;
  name: () => Promise<String>;
  hasStation: () => Promise<Boolean>;
}

export interface ExoplanetSubscription
  extends Promise<AsyncIterator<Exoplanet>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<Int>>;
  name: () => Promise<AsyncIterator<String>>;
  hasStation: () => Promise<AsyncIterator<Boolean>>;
}

export interface ExoplanetNullablePromise
  extends Promise<Exoplanet | null>,
    Fragmentable {
  id: () => Promise<Int>;
  name: () => Promise<String>;
  hasStation: () => Promise<Boolean>;
}

export interface ExoplanetConnection {
  pageInfo: PageInfo;
  edges: ExoplanetEdge[];
}

export interface ExoplanetConnectionPromise
  extends Promise<ExoplanetConnection>,
    Fragmentable {
  pageInfo: <T = PageInfoPromise>() => T;
  edges: <T = FragmentableArray<ExoplanetEdge>>() => T;
  aggregate: <T = AggregateExoplanetPromise>() => T;
}

export interface ExoplanetConnectionSubscription
  extends Promise<AsyncIterator<ExoplanetConnection>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<ExoplanetEdgeSubscription>>>() => T;
  aggregate: <T = AggregateExoplanetSubscription>() => T;
}

export interface PageInfo {
  hasNextPage: Boolean;
  hasPreviousPage: Boolean;
  startCursor?: String;
  endCursor?: String;
}

export interface PageInfoPromise extends Promise<PageInfo>, Fragmentable {
  hasNextPage: () => Promise<Boolean>;
  hasPreviousPage: () => Promise<Boolean>;
  startCursor: () => Promise<String>;
  endCursor: () => Promise<String>;
}

export interface PageInfoSubscription
  extends Promise<AsyncIterator<PageInfo>>,
    Fragmentable {
  hasNextPage: () => Promise<AsyncIterator<Boolean>>;
  hasPreviousPage: () => Promise<AsyncIterator<Boolean>>;
  startCursor: () => Promise<AsyncIterator<String>>;
  endCursor: () => Promise<AsyncIterator<String>>;
}

export interface ExoplanetEdge {
  node: Exoplanet;
  cursor: String;
}

export interface ExoplanetEdgePromise
  extends Promise<ExoplanetEdge>,
    Fragmentable {
  node: <T = ExoplanetPromise>() => T;
  cursor: () => Promise<String>;
}

export interface ExoplanetEdgeSubscription
  extends Promise<AsyncIterator<ExoplanetEdge>>,
    Fragmentable {
  node: <T = ExoplanetSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number;
export type ID_Output = string;

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string;

export type Long = string;

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.
*/
export type Int = number;

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean;

/**
 * Model Metadata
 */

export const models: Model[] = [
  {
    name: "Exoplanet",
    embedded: false
  }
];

/**
 * Type Defs
 */

export const prisma: Prisma;
