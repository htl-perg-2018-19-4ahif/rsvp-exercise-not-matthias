export interface IPartyData {
    title: string;
    location: string;
    date: Date;
}

export interface IGuest {
    firstname: string;
    lastname: string;
}

export interface IParty {
    partyId: number;
    partyData: IPartyData;
    guests: IGuest[];
};