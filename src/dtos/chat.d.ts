/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 3.2.1263 on 2024-10-05 15:02:58.

export interface MessageRequestDTO {
    content: string;
    receiverPhoneNumber: number;
    isWhatsApp: boolean;
}

export interface ClientCreditsRequestDTO {
    credits: number;
}

export interface ClientRequestDTO {
    name: string;
    email: string;
    phoneNumber: number;
    cpf: number;
    cnpj: number;
    firmName: string;
    paymentPlan: PaymentPlanEnum;
}

export interface ClientResponseDTO {
    id: number;
    name: string;
    email: string;
    phoneNumber: number;
    cpf: number;
    cnpj: number;
    firmName: string;
    paymentPlan: PaymentPlanResponseDTO;
    messages: MessageResponseDTO[];
}

export interface MessageResponseDTO {
    id: number;
    createdAt: Date;
    content: string;
    receiverPhoneNumber: number;
    isWhatsApp: boolean;
}

export interface PaymentPlanResponseDTO {
    id: number;
    type: PaymentPlanEnum;
}

export interface PostPaidPlanResponseDTO extends PaymentPlanResponseDTO {
    creditLimit: number;
    creditSpent: number;
}

export interface PrePaidPlanResponseDTO extends PaymentPlanResponseDTO {
    credits: number;
}

export interface Page<T> extends Slice<T> {
    totalPages: number;
    totalElements: number;
}

export interface Sort extends Streamable<Order> {
    unsorted: boolean;
    sorted: boolean;
}

export interface Pageable {
    offset: number;
    sort: Sort;
    unpaged: boolean;
    paged: boolean;
    pageSize: number;
    pageNumber: number;
}

export interface Slice<T> extends Streamable<T> {
    size: number;
    content: T[];
    number: number;
    sort: Sort;
    first: boolean;
    last: boolean;
    pageable: Pageable;
    numberOfElements: number;
}

export interface Streamable<T> extends Iterable<T>, Supplier<Stream<T>> {
    empty: boolean;
}

export interface Order {
    direction: Direction;
    property: string;
    ignoreCase: boolean;
    nullHandling: NullHandling;
    descending: boolean;
    ascending: boolean;
}

export interface Iterable<T> {
}

export interface Supplier<T> {
}

export interface Stream<T> extends BaseStream<T, Stream<T>> {
}

export interface BaseStream<T, S> extends AutoCloseable {
    parallel: boolean;
}

export interface AutoCloseable {
}

export type PaymentPlanEnum = "PRE_PAID" | "POST_PAID";

export type Direction = "ASC" | "DESC";

export type NullHandling = "NATIVE" | "NULLS_FIRST" | "NULLS_LAST";
