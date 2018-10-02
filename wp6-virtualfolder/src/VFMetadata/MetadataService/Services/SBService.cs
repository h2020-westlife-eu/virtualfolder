using ServiceStack.DataAnnotations;

namespace MetadataService.Services
{
    /** DEPRECATED
    */
    public class SBService
    {

            [AutoIncrement]
            public long Id { get; set; }

            public bool enabled { get; set; }
            public string Shell { get; set; }
            public string Name { get; set; }
            public string Username { get; set; }
            public string Securetoken { get; set; }
            public string Description { get; set; }
            public string TriggerScript { get; set; }
            public string TriggerOutput { get; set; }

    }
}