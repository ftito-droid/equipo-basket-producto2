import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPlayers',
  standalone: true
})
export class FilterPlayersPipe implements PipeTransform {

  transform(players: any[], search: string, position: string, age: number | null, team: string): any[] {
    if (!players) return [];

    return players.filter(player => {
      const matchesName = search ? player.nombre.toLowerCase().includes(search.toLowerCase()) : true;
      const matchesPosition = position ? player.posicion === position : true;
      const matchesAge = age ? player.edad >= age : true;
      const matchesTeam = team ? player.equipo.toLowerCase().includes(team.toLowerCase()) : true;

      return matchesName && matchesPosition && matchesAge && matchesTeam;
    });
  }
}
