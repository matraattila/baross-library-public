export interface Book {
  raktariJel: number
  cutterSzam: string
  // bibliografia: Bibliografia
  cim?: string
  szerzoiAdatok?: {
    szerzo: string
    adatok: string
  }
  kiadas?: string
  megjelenes?: string
  fizikaiJellemzok?: string
  sorozat?: string
  megjegyzesek?: string
  kategoria?: string
}

export interface Bibliografia {
  // Global seperator
  // . -  (dot-space-dash)
  cim?: string
  szerzoiAdatok?: {
    szerzo: string
    adatok: string
  }
  kiadas?: string
  megjelenes?: string
  fizikaiJellemzok?: string
  sorozat?: string
  megjegyzesek?: string
  kategoria?: string
}
