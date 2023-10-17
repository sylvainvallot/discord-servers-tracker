import Image from 'next/image';

export default function CallToAction() {
    return (
      <div className="container p-12 flex flex-col lg:flex-row items-center justify-between">
        <div>
          <h3 className="font-bold text-2xl">Envie d'ajouter votre serveur ?</h3>
          <p className="mt-6 text-lg leading-8">
            Contactez-moi sur Discord @syvt ou envoyez moi un email <a href="mailto:contact@sylvainvallot.com" className="underline font-mono">contact@sylvainvallot.com</a>
          </p>
        </div>
        <div className="pt-5 justify-center gap-x-6">
            <a
              href="https://discord.gg/la-nouvelle-academie-679078702084259861"
              className="bg-gray-300 rounded-md px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Rejoindre le Discord
            </a>
          </div>
      </div>
    )
};
  