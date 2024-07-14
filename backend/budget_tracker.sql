--
-- PostgreSQL database dump
--

-- Dumped from database version 14.12 (Homebrew)
-- Dumped by pg_dump version 14.12 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Categories; Type: TABLE; Schema: public; Owner: haikalnurkalam
--

CREATE TABLE public."Categories" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);


ALTER TABLE public."Categories" OWNER TO haikalnurkalam;

--
-- Name: Categories_id_seq; Type: SEQUENCE; Schema: public; Owner: haikalnurkalam
--

CREATE SEQUENCE public."Categories_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Categories_id_seq" OWNER TO haikalnurkalam;

--
-- Name: Categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: haikalnurkalam
--

ALTER SEQUENCE public."Categories_id_seq" OWNED BY public."Categories".id;


--
-- Name: Transactions; Type: TABLE; Schema: public; Owner: haikalnurkalam
--

CREATE TABLE public."Transactions" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    amount numeric(10,2) NOT NULL,
    "inOrOut" integer NOT NULL,
    category character varying(255) NOT NULL,
    description character varying(255),
    "transactionDate" timestamp with time zone NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);


ALTER TABLE public."Transactions" OWNER TO haikalnurkalam;

--
-- Name: Transactions_id_seq; Type: SEQUENCE; Schema: public; Owner: haikalnurkalam
--

CREATE SEQUENCE public."Transactions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Transactions_id_seq" OWNER TO haikalnurkalam;

--
-- Name: Transactions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: haikalnurkalam
--

ALTER SEQUENCE public."Transactions_id_seq" OWNED BY public."Transactions".id;


--
-- Name: Users; Type: TABLE; Schema: public; Owner: haikalnurkalam
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);


ALTER TABLE public."Users" OWNER TO haikalnurkalam;

--
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: haikalnurkalam
--

CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Users_id_seq" OWNER TO haikalnurkalam;

--
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: haikalnurkalam
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- Name: Categories id; Type: DEFAULT; Schema: public; Owner: haikalnurkalam
--

ALTER TABLE ONLY public."Categories" ALTER COLUMN id SET DEFAULT nextval('public."Categories_id_seq"'::regclass);


--
-- Name: Transactions id; Type: DEFAULT; Schema: public; Owner: haikalnurkalam
--

ALTER TABLE ONLY public."Transactions" ALTER COLUMN id SET DEFAULT nextval('public."Transactions_id_seq"'::regclass);


--
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: haikalnurkalam
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- Data for Name: Categories; Type: TABLE DATA; Schema: public; Owner: haikalnurkalam
--

COPY public."Categories" (id, "userId", name, "createdAt", "updatedAt") FROM stdin;
1	2	Family	2024-07-08 21:37:54.488+07	2024-07-08 21:37:54.489+07
3	2	Rown	2024-07-08 21:38:13.275+07	2024-07-08 21:38:13.275+07
4	2	Rown	2024-07-08 21:38:27.508+07	2024-07-08 21:38:27.508+07
\.


--
-- Data for Name: Transactions; Type: TABLE DATA; Schema: public; Owner: haikalnurkalam
--

COPY public."Transactions" (id, "userId", amount, "inOrOut", category, description, "transactionDate", "createdAt", "updatedAt") FROM stdin;
3	2	2000.00	1	family	seru seruan	2024-10-12 07:00:00+07	2024-07-12 08:07:27.905+07	2024-07-12 08:07:27.905+07
4	3	2000.00	1	family	seru seruan	2024-10-12 07:00:00+07	2024-07-12 08:10:04.964+07	2024-07-12 08:10:04.965+07
5	3	111.00	1	Eat	123	2024-07-13 07:00:00+07	2024-07-13 11:12:54.286+07	2024-07-13 11:12:54.294+07
6	3	2000.00	1	Other	Electricity on my home	2024-07-13 07:00:00+07	2024-07-13 11:13:17.656+07	2024-07-13 11:13:17.656+07
7	3	10.00	1	Other	Park	2024-07-13 07:00:00+07	2024-07-13 11:14:33.995+07	2024-07-13 11:14:33.995+07
8	3	2000.00	2	Freelance	Freelance Web Developer	2024-07-13 07:00:00+07	2024-07-13 11:30:07.481+07	2024-07-13 11:30:07.482+07
9	3	10.00	1	Transportation	Janji Jiwa Coffee	2024-07-13 07:00:00+07	2024-07-13 11:31:49.687+07	2024-07-13 11:31:49.688+07
10	3	200.00	1	Utilities	Tang	2024-07-13 07:00:00+07	2024-07-13 11:32:33.284+07	2024-07-13 11:32:33.284+07
11	3	100.00	1	Eat	200	2024-07-13 11:33:26+07	2024-07-13 11:33:26.768+07	2024-07-13 11:33:26.768+07
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: haikalnurkalam
--

COPY public."Users" (id, username, email, password, "createdAt", "updatedAt") FROM stdin;
2	haikal11	haikaln@gmail.com	$2b$10$3xHkd.VMBl7n9PXrnm9uNepO38Y5.zjVKVvXdgphLvK6HbRhQnvNK	2024-07-08 20:16:48.069+07	2024-07-08 20:16:48.07+07
3	hoho	hoho@gmail.com	$2b$10$yZ6dwMylOL00C8r5fhmQ2uPLn/CNRdQoMPAROiKMpdX2sZv6lUTk.	2024-07-09 19:33:19.08+07	2024-07-09 19:33:19.081+07
4	roni	roni@gmail.com	$2b$10$gInsDC4vh/0ZMftgF7dJRueOnYPoUNN2F8zm2SXMI/u4fkOMuKM1e	2024-07-09 20:52:26.458+07	2024-07-09 20:52:26.459+07
5	roni123	roni222@gmail.com	$2b$10$Tt80T14FRHSj4DXbxhW/BuPeOmdw.fi/sRH6jqjZJEu3ch.3bjfjO	2024-07-09 20:55:24.731+07	2024-07-09 20:55:24.733+07
6	asd	haikalnurkalam34@gmail.com	$2b$10$o2GzF6SyuwKqkTkFlL5Ow.ALGbNlIZxJSNJl/jkUs66f.SZuKd9cG	2024-07-09 21:08:50.274+07	2024-07-09 21:08:50.274+07
7	guru	guru@gmail.com	$2b$10$oBxYjHykv/UdojFlk7TkU.y7/1OWL75q/9Z3tNFnDeLSBEEKNJ062	2024-07-11 18:59:33.334+07	2024-07-11 18:59:33.339+07
\.


--
-- Name: Categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: haikalnurkalam
--

SELECT pg_catalog.setval('public."Categories_id_seq"', 4, true);


--
-- Name: Transactions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: haikalnurkalam
--

SELECT pg_catalog.setval('public."Transactions_id_seq"', 11, true);


--
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: haikalnurkalam
--

SELECT pg_catalog.setval('public."Users_id_seq"', 7, true);


--
-- Name: Categories Categories_pkey; Type: CONSTRAINT; Schema: public; Owner: haikalnurkalam
--

ALTER TABLE ONLY public."Categories"
    ADD CONSTRAINT "Categories_pkey" PRIMARY KEY (id);


--
-- Name: Transactions Transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: haikalnurkalam
--

ALTER TABLE ONLY public."Transactions"
    ADD CONSTRAINT "Transactions_pkey" PRIMARY KEY (id);


--
-- Name: Users Users_email_key; Type: CONSTRAINT; Schema: public; Owner: haikalnurkalam
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key" UNIQUE (email);


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: haikalnurkalam
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: Users Users_username_key; Type: CONSTRAINT; Schema: public; Owner: haikalnurkalam
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key" UNIQUE (username);


--
-- Name: Categories Categories_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: haikalnurkalam
--

ALTER TABLE ONLY public."Categories"
    ADD CONSTRAINT "Categories_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id);


--
-- Name: Transactions Transactions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: haikalnurkalam
--

ALTER TABLE ONLY public."Transactions"
    ADD CONSTRAINT "Transactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id);


--
-- PostgreSQL database dump complete
--

