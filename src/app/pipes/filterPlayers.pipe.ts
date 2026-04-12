import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPlayers',
  standalone: true
})
export class FilterPlayersPipe implements PipeTransform {

  transform(players: any[] | null, search: string, position: string, age: number | null, team: string): any[] {
    if (!players) return [];

    // Función para quitar tildes y dejar en minúsculas
  const cleanText = (str: string) => 
    str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim() : "";

  return players.filter(player => {
    const matchesName = search ? cleanText(player.nombre).includes(cleanText(search)) : true;
    
    // Ahora comparamos "pivot" contra "pivot" (ambos limpios)
    const matchesPosition = position ? cleanText(player.posicion) === cleanText(position) : true;

    const matchesAge = age ? player.edad >= age : true;
    const matchesTeam = team ? cleanText(player.equipo).includes(cleanText(team)) : true;


      return matchesName && matchesPosition && matchesAge && matchesTeam;
    });
  }
}
