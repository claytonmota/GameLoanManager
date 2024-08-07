using MongoDB.Driver;
using GameLoanManager.Domain.Entities;
using Microsoft.Extensions.Options;
using GameLoanManager.Domain;

namespace GameLoanManager.Infrastructure.Data
{
    public class MongoDbContext
    {
        private readonly IMongoDatabase _database;

        public MongoDbContext(IOptions<DatabaseSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            _database = client.GetDatabase(settings.Value.DatabaseName);
        }

        public IMongoCollection<Game> Games => _database.GetCollection<Game>("Games");
        public IMongoCollection<Friend> Friends => _database.GetCollection<Friend>("Friends");
        public IMongoCollection<Loan> Loans => _database.GetCollection<Loan>("Loans");
    }
}