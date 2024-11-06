CREATE TABLE public.stats (
	email varchar NOT NULL,
	fastest_time int4 NOT NULL,
	lowest_num_mistakes int4 NOT NULL,
	score int4 NOT NULL,
	CONSTRAINT stats_pk PRIMARY KEY (email)
);
