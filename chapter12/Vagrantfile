Vagrant.configure(2) do |config|
  
  config.vm.box = "scotch/box"
  config.vm.hostname = "scotchbox"
  config.vm.synced_folder ".", "/var/www",
    :mount_options => ["dmode=777", "fmode=666"]
  
  # set the network mode to get a private, local, DHCP assigned IP address
  # vagrant ssh into the box and run 'ifconfig' to find the IP address
  config.vm.network "private_network", type: "dhcp"
  
    # forward LiveReload traffic between the guest VM and the host
  config.vm.network "forwarded_port", guest: 35729, host: 35729
  
  end
