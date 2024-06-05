import { StarshipProperties } from "./starship.properties";

export interface StarshipResult {
    properties: StarshipProperties;
    description: string;
    _id: string;
    uid: string;
    __v: number;
}