import { createSlice } from "@reduxjs/toolkit";
import { BookInfo } from "./book-card";

const initialState: BookInfo[] = [
    {
        "id": "222",
        "name": "Canoe Lake",
        "price": 22,
        "category": "Fantasy",
        "description": "A troubled American woman travels to a small Ontario town, determined to find the mother she has never known. As she searches through dusty records and stirs up old memories among those around her, three young people emerge from the mists of the past . . . a beautiful woman named Jenny, a shy local boy named Russell, and a dark-eyed painter named Tom, who changes the course of Jenny and Russell’s lives. Historical reality and conjecture are skilfully interwoven with intrigue and suspense as these three move unwittingly toward tragedy."
    },
    {
        "id": "312",
        "name": "Night of the Living Dummy",
        "price": 5.99,
        "category": "Horror",
        "description": "Lindy names the ventriloquist's dummy she finds Slappy. Slappy is kind of ugly, but he's a lot of fun. Lindy's having a great time learning to make Slappy move and talk. But Kris is jealous of all the attention her sister is getting. It's no fair. Why does Lindy always have all the luck?Kris decides to get a dummy of her own. She'll show Kris. Then weird things begin to happen. Nasty things. Evil things. No way a dummy can be causing all the trouble. Or is there?Now with all-new bonus material revealing Slappy's secrets and more."
    }
];

export const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        add: (state, {payload}) => {
            return [payload, ...state];
        },
        deleteBook: (state, {payload}) => {
            return state.filter((b: any) => b.id !== payload);
        },
        update: (state, {payload}) => {
            return state.map((b: BookInfo) => {
                if (b.id === payload.id) {
                    return {...payload};
                }
                return b;
            });
        },
    }
});

export const {
    add,
    deleteBook,
    update
} = booksSlice.actions;
export default booksSlice.reducer;
