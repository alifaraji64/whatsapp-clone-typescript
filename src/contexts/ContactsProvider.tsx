import React, { createContext } from 'react';
import { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import {Contact} from '../types'
import { ContactContextInterface } from '../types';
export const contactContext = createContext<ContactContextInterface|null>(null);
const ContactsProvider = ({ children }: { children: React.ReactNode }) => {
    //get contacts from localstorage
    const [contacts, setContacts] = useLocalStorage('contacts', []);
    const createContact = (id: string, name: string) => {
        setContacts((prevContacts:Contact[]) => {
            return [...prevContacts, { id, name }] as Contact[]
        })
    }
    const findName = (id: string,sender:any) => {
        console.log(contacts);
        console.log(id);
        console.log(sender);



        const name = contacts.find((contact:Contact) => contact.id == id).name || id;
        return name;
    }
    return (
        <contactContext.Provider value={{ contacts, createContact, findName }}>
            {children}
        </contactContext.Provider>
    );
}

export default ContactsProvider;