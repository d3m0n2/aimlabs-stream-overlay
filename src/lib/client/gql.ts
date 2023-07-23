const apiUrl = "https://api.aimlab.gg/graphql";


const prepareQuery = {
    findAimlabProfile: (username: string) => {
        const query = `
            query GetProfile($username: String) {
                aimlabProfile(username: $username) {
                    username
                    user {
                        id
                    }
                    ranking {
                        rank {
                            displayName
                        }
                        skill
                    }
                }
            }
        `;

        const variables = {
            username: username,
        };

        return {
            query,
            variables,
        }
    },
    voltaicValorantStats: (userId: string) => {
        const query = `
            query GetAimlabProfileAgg($where: AimlabPlayWhere!) {
                aimlab {
                    plays_agg(where: $where) {
                        group_by {
                            task_id
                            task_name
                        }
                        aggregate {
                            count
                            avg {
                                score
                                accuracy
                            }
                            max {
                                score
                                accuracy
                                created_at
                            }
                        }
                    }
                }
            }
        `;
        const variables = {
            where: {
                is_practice: {
                    _eq: false,
                },
                score: {
                    _gt: 0,
                },
                user_id: {
                    _eq: userId,
                },
            },
        };

        return {
            query,
            variables,
        }
    }
}

export async function fetchAimlabProfile(username: string): Promise<AimlabProfile> {
    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                prepareQuery.findAimlabProfile(username),
            ),
        });

        const { data } = await response.json();

        return data as AimlabProfile;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

export async function getVoltaicValorantStats(userId: string): Promise<AimlabPlaysData> {
    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                prepareQuery.voltaicValorantStats(userId),
            ),
        });

        const { data } = await response.json();

        console.log(data);

        return data as AimlabPlaysData;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}