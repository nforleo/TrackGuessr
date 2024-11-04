CREATE TABLE public.fastest_time (
	email varchar NOT NULL,
	fastest_time int4 NOT NULL,
	CONSTRAINT fastest_time_pk PRIMARY KEY (email)
);
COMMENT ON TABLE public.fastest_time IS 'Save the fastest time for a user in TrackGssr';