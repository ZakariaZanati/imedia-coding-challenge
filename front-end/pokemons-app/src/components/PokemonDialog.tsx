import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';

interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: { type: { name: string } }[];
}

interface DialogProps {
  pokemonDetails: PokemonDetails |null;
  dialogOpen: boolean;
  handleCloseDialog: () => void;
}

export const PokemonDialog: React.FC<DialogProps> = ({ pokemonDetails, dialogOpen, handleCloseDialog }) => {
  return (
    <Dialog
      open={dialogOpen}
      onClose={handleCloseDialog}
      maxWidth="md"
      PaperProps={{
        style: {
          borderRadius: 20,
          boxShadow: '0px 10px 30px -5px rgba(0,0,0,0.3)',
          backgroundColor: '#f0f0f0',
          padding: 20,
          minWidth: 500,
        },
      }}
    >
      {pokemonDetails && (
        <>
          <DialogTitle style={{ display: 'flex', justifyContent: 'center' }}>{pokemonDetails.name}</DialogTitle>
          <DialogContent style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonDetails.id}.png`}
                alt={pokemonDetails.name}
                style={{ width: 200, height: 200 }}
              />
            </div>
            <div>
              <DialogContentText>ID: {pokemonDetails.id}</DialogContentText>
              <DialogContentText>Height: {pokemonDetails.height}</DialogContentText>
              <DialogContentText>Weight: {pokemonDetails.weight}</DialogContentText>
              <DialogContentText>Type(s): {pokemonDetails.types.map((type) => type.type.name).join(', ')}</DialogContentText>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};
