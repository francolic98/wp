//// App Models

export interface File 
{
    _id: string,
    Name: string,
    Size: number,
    UploadDate: Date;
    //Categories: Category[],
    //_defaultSortIndex: number
}

export enum Category 
{
    Files = "files",
    Shared = "shared",
    Pinned = "pinned",
    Trash = "trash"
}

export enum Page 
{
    Files = "files",
    Shared = "shared",
    Pinned = "pinned",
    Trash = "trash"
}

export enum SortOrder
{
    Default,
    NameAToZ,
    NameZToA
}

//// Models

export interface User
{
    Username: string
}