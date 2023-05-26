import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvents from '@testing-library/user-event';
import NewPlace from "./newPlace";


 describe("Verification composant JSON", () => {
    describe("Affiche categorie depuis l'API", () => {
        it("Category" , () => {
            render(<NewPlace/> );
            userEvents.selectedOption(screen.getByTestId(`select-category`) , [''])
            expect(screen.getByTestId('1').selected).toBe(true)
        })
    })
 });