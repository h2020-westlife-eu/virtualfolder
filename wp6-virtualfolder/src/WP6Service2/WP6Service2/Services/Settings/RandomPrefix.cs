using System;
using System.Collections.Generic;
using System.Linq;

namespace MetadataService.Services.Settings
{
    public class RandomPrefix
    {
        const string BaseUrlChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        public static string ShortUrl
        {
            get
            {
                const int numberOfCharsToSelect = 8;
                int maxNumber = BaseUrlChars.Length;

                var rnd = new Random();
                var numList = new List<int>();

                for (int i = 0; i < numberOfCharsToSelect; i++)
                    numList.Add(rnd.Next(maxNumber));

                return numList.Aggregate(string.Empty, (current, num) => current + BaseUrlChars.Substring(num, 1));
            } 
        }

        public static string RandomString(int length)
        {
            int maxNumber = BaseUrlChars.Length;

            var rnd = new Random();
            var numList = new List<int>();

            for (int i = 0; i < length; i++)
                numList.Add(rnd.Next(maxNumber));

            return numList.Aggregate(string.Empty, (current, num) => current + BaseUrlChars.Substring(num, 1));
            
        }
    }
}