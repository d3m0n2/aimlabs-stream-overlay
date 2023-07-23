interface AimlabProfile {
    aimlabProfile: {
        username: string;
        user: {
            id: string;
        };
        ranking: {
            rank: {
                displayName: string;
            };
            skill: number;
        };
    };
}

interface AimlabPlay {
    aggregate: {
        count: number;
        avg: {
            score: number;
            accuracy: number;
        };
        max: {
            score: number;
            accuracy: number;
            created_at: string;
        };
    };
    group_by: {
        task_id: string;
        task_name: string;
    };
    scenario: {
        link: string;
        benchmarks: {
            name: string;
            season: string;
            version: string;
        };
        category: string;
        subcategory: string;
        tier: number;
        thresholds: number[];
    };
}

interface AimlabPlaysData {
    aimlab: {
        plays_agg: AimlabPlay[];
    };
}