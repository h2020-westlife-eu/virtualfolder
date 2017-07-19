using System.IO.Ports;

namespace WP6Service2.Services.PerUserProcess
{
    /** common strategy methods to obtain args and get job info
    */
    public interface IJobStrategy
    {
        string getArgs();        
        string getStopArgs();
        int Start();
        void Stop();
        string getUrl();
    }
}