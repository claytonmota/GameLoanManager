using System;
using System.Net.Http;
using System.Threading.Tasks;
using GameLoanManager.Domain.Entities;
using MongoDB.Driver;
using System.Collections.Generic;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using GameLoanManager.Infrastructure.Data;

namespace GameLoanManager.Infrastructure.Services
{
    public class GameDataInitializer
    {
        private readonly IMongoCollection<Game> _gameCollection;
        private readonly HttpClient _httpClient;
        private readonly ILogger<GameDataInitializer> _logger;

        public GameDataInitializer(MongoDbContext context, ILogger<GameDataInitializer> logger)
        {
            _gameCollection = context.Games;
            _httpClient = new HttpClient();
            _logger = logger;
        }

        public async Task InitializeGameDataAsync()
        {
            var gameCount = await _gameCollection.CountDocumentsAsync(FilterDefinition<Game>.Empty);

            if (gameCount > 0)
            {
                _logger.LogInformation("A coleção de jogos já está populada.");
                return;
            }

            _logger.LogInformation("Iniciando a carga inicial dos jogos.");
            try
            {
                var response = await _httpClient.GetStringAsync("https://api.sampleapis.com/playstation/games");
                var games = JsonSerializer.Deserialize<List<Game>>(response, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                if (games != null && games.Count > 0)
                {
                    _logger.LogInformation($"Inserindo {games.Count} jogos na coleção.");
                    await _gameCollection.InsertManyAsync(games);
                }
                else
                {
                    _logger.LogWarning("Nenhum jogo foi encontrado na resposta da API.");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ocorreu um erro ao inicializar os dados dos jogos.");
                throw;
            }
        }
    }
}

