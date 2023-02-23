module Wasabi

using DataFrames

abstract type Model end
abstract type ModelConstraint end
abstract type ConnectionConfiguration end

"""
    tablename(m::Type{T}) where {T <: Model}
    Returns the name of the table for the given model.
"""
tablename(m::Type{T}) where {T<:Model} = join("_$word" for word in lowercase.(split(String(Base.typename(m).name), r"(?=[A-Z])")))[2:end]


"""
    colnames(m::Type{T}) where {T <: Model}
    Returns the names of the columns for the given model.
"""
colnames(m::Type{T}) where {T<:Model} = collect(fieldnames(m))


"""
    coltype(m::Type{T}, field::Symbol) where {T <: Model}
    Returns the julia type of the given column.
"""
coltype(m::Type{T}, field::Symbol) where {T<:Model} = fieldtype(m, field)

"""
    connect(config::ConnectionConfiguration)
    Connects to the database using the given configuration.
"""
function connect end

"""
    disconnect(db::Any)
    Disconnects from the database.
"""
function disconnect end

"""
    create_schema(db::Any, m::Type{T}, constraints::Vector{ModelConstraint}) where {T <: Model}
    Creates the schema for the given model and constraints.
"""
function create_schema end

"""
    delete_schema(db::Any, m::Type{T}) where {T <: Model}
    Deletes the schema for the given model.
"""
function delete_schema end

"""
    execute_raw_query(db::Any, query::String, params::Vector{Any})
    Executes the given query with the given parameters.
"""
function execute_raw_query end

"""
    first(db::Any, m::Type{T})
    Returns the first row of the given model with the given id.
"""
function first end

"""
    df2model(m::Type{T}, df::DataFrame) where {T <: Model}
    Converts the given DataFrame to the given model.
"""
function df2model(m::Type{T}, df::DataFrame) where {T<:Wasabi.Model}
    return [m(map(col -> row[col], Wasabi.colnames(m))...) for row in eachrow(df)]
end

"""
    model2tuple(m::T) where {T <: Model}
    Converts the given model to a tuple.
"""
function model2tuple(m::T) where {T <: Model}
    return tuple(map(col -> (col, getfield(m, col)), Wasabi.colnames(T))...)
end

"""
    begin_transaction(db::Any)
    Begins a transaction.
"""
function begin_transaction end

"""
    commit(db::Any)
    Commits the current transaction.
"""
function commit end

"""
    rollback(db::Any)
    Rolls back the current transaction.
"""
function rollback end

"""
    insert(db::Any, model::T) where {T <: Model}
    Inserts the given model into the database.
"""
function insert end

include("constraints.jl")
include("backends/sqlite/sqlite.jl")

end