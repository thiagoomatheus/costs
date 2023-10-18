export type ProjectType = {
id: string,
name: string | undefined,
budget: number | undefined,
cost: number | undefined,
category: string | undefined,
services: ServiceType[] |
    undefined
}

export type ServiceType = {
id: string,
title: string,
cost: number,
description: string
}

export type Categories = {
id: number,
name: string
}[]