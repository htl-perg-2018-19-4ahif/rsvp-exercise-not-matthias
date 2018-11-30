export interface PartyData {
    title: string;
    location: string;
    date: Date;
}

export interface Guest {
    firstname: string;
    lastname: string;
}

export interface Party {
    partyId: number;
    partyData: PartyData;
    guests: Guest[];
};