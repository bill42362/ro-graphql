// schema.js

const schema = `
    type Monster {
        id: ID!
        name: String!
        englishName: String!
        level: Int!
        healthPoint: Int!
        basePoint: Int!
        jobPoint: Int!
        race: String!
        nature: String!
        size: String!
    }

    type Query {
        monster(id: ID!): Monster
        monsters: [Monster]!
    }
`;

export { schema };
