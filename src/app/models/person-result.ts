import { PersonProperties } from "./person-properties";

export interface PersonResult {
    properties: PersonProperties;
    description: string;
    _id: string;
    uid: string;
    __v: number;
}