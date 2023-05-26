import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvents from '@testing-library/user-event';
import NewBallade from "./newBallade";


 describe("Verification composant JSON", () => {
    describe("Affiche les tag depuis l'API", () => {
        it("Tag" , () => {
            render(<NewBallade/> );
            userEvents.selectedOption(screen.getByTestId(`select-tag`) , [''])
            expect(screen.getByTestId('1').selected).toBe(true)
        })
    })
 });