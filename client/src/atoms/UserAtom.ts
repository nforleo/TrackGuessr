import { atom } from 'jotai';
import { User } from '../models/User';

export const UserAtom = atom<User | null>(null);