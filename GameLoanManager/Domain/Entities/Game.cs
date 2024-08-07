using System.Collections.Generic;
using MongoDB.Bson.Serialization.Attributes;

namespace GameLoanManager.Domain.Entities
{
    public class Game
    {
        [BsonId]
        [BsonElement("id")]
        public int Id { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("genre")]
        public List<string> Genre { get; set; }

        [BsonElement("developers")]
        public List<string> Developers { get; set; }

        [BsonElement("publishers")]
        public List<string> Publishers { get; set; }

        [BsonElement("releaseDates")]
        public ReleaseDates ReleaseDates { get; set; }
    }

    public class ReleaseDates
    {
        [BsonElement("Japan")]
        public string Japan { get; set; }

        [BsonElement("NorthAmerica")]
        public string NorthAmerica { get; set; }

        [BsonElement("Europe")]
        public string Europe { get; set; }

        [BsonElement("Australia")]
        public string Australia { get; set; }
    }
}
