type data = {
    nom : string,
    unite : string,
    unite_short : string,
    trendType : string,
    france : states[],
    departements : states[],
    regions : states[]
}

type states = {
    last_value : string,
    last_date : string,
    evol : string,
    evol_percentage : string,
    evol_color : string
    level : string,
    code_level : string
    values : value[]
}

type value = {
    date : string,
    value : string
}

export type {
    data,
    states,
    value
}